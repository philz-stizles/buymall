import bcrypt from 'bcryptjs';

import config from '@src/config';
import Permission from '@src/models/permission.model';
import Role, { RoleType } from '@src/models/role.model';
import { User } from '@src/models';
import { IUser } from '@src/models/user.model';

// const seedPermissions = () => {
//   try {
//     const permissions = JSON.parse(
//       fs.readFileSync(path.join(__dirname, 'data', 'permissions.json'), 'utf-8')
//     );
//   } catch (error) {
//     console.log('SEED PERMISSIONS: ', error);
//     throw error;
//   }
// };

const seedPermissions = async () => {
  try {
    const permissions: any = {
      VENDOR: [
        'CREATE',
        'READ',
        'READ_OWN',
        'UPDATE',
        'UPDATE_OWN',
        'REMOVE',
        'REMOVE_OWN',
        'WRITE',
      ],
      AUDIT: ['READ', 'REMOVE'],
      REVIEW: [
        'CREATE',
        'READ',
        'READ_OWN',
        'UPDATE',
        'UPDATE_OWN',
        'REMOVE',
        'REMOVE_OWN',
        'WRITE',
        'WRITE_OWN',
      ],
      CATEGORY: [
        'CREATE',
        'READ',
        'READ_OWN',
        'UPDATE',
        'UPDATE_OWN',
        'REMOVE',
        'REMOVE_OWN',
        'WRITE',
        'WRITE_OWN',
      ],
      SUB_CATEGORY: [
        'CREATE',
        'READ',
        'READ_OWN',
        'UPDATE',
        'UPDATE_OWN',
        'REMOVE',
        'REMOVE_OWN',
        'WRITE',
        'WRITE_OWN',
      ],
      ORDER: [],
      CART: [],
      TRANSACTION: [],
    };

    const count = await Permission.countDocuments();
    if (count <= 0) {
      for (const permission in permissions) {
        await new Permission({
          name: permission,
          description: `The user will have ${permissions[permission].join(
            ', '
          )} access to the ${permission} module`,
          actions: permissions[permission],
        }).save();
      }

      console.log('Permissions seeded successfully!!');
    } else {
      console.log('Permissions in database!!');
    }
  } catch (error: any | unknown) {
    console.log('Permissions seeding failed', error.message);
  }
};

const seedRoles = async () => {
  const permissions = await Permission.find({}, '_id');
  const roles = [
    {
      name: 'ADMIN',
      description: 'User can high level access',
      permissions: {
        VENDOR: {
          CREATE: true,
          READ: true,
          READ_OWN: true,
          UPDATE: true,
          UPDATE_OWN: true,
          REMOVE: true,
          REMOVE_OWN: true,
          WRITE: true,
        },
        AUDIT: {
          READ: true,
        },
        CATEGORY: {
          CREATE: true,
          READ: true,
          READ_OWN: true,
          UPDATE: true,
          UPDATE_OWN: true,
          REMOVE: true,
          REMOVE_OWN: true,
          WRITE: true,
          WRITE_OWN: true,
        },
        PRODUCT: {
          CREATE: true,
          READ: true,
          READ_OWN: true,
          UPDATE: true,
          UPDATE_OWN: true,
          REMOVE: true,
          REMOVE_OWN: true,
          WRITE: true,
          WRITE_OWN: true,
        },
      },
    },
    {
      name: 'VENDOR',
      description: 'User can high level access',
      // permissions: permissions.filter(permission => )
    },
    {
      name: 'CUSTOMER',
      description: 'User can high level access',
      permissions: [],
    },
    {
      name: 'AUDITOR',
      description: 'User can high level access',
      permissions: [],
    },
    {
      name: 'EDITOR',
      description: 'User can high level access',
      permissions: [],
    },
    {
      name: 'VISITOR',
      description: 'User can high level access',
      permissions: [],
    },
  ];

  try {
    const count = await Role.countDocuments();
    if (count <= 0) {
      for (const role of roles) {
        await new Role({
          name: role.name,
          description: role.description,
          permissions: role.permissions,
        }).save();
      }

      console.log('Roles seeded successfully!!');
    } else {
      console.log('Roles in database!!');
    }
  } catch (error: any | unknown) {
    console.log('Roles seeding failed', error.message);
  }
};

const seedDefaultUsers = async () => {
  try {
    // const role = await Role.findOne({ name: 'ADMIN'});
    const adminUser: Partial<IUser> = {
      email: config.admin.username,
      firstName: 'Theophilus',
      lastName: 'Ighalo',
      password: await bcrypt.hash(config.admin.password, 8),
      role: RoleType.ADMIN,
    };
    await User.findOneAndUpdate({ email: adminUser.email }, adminUser, {
      upsert: true,
    });
  } catch (error) {
    console.log('SEED DEFAULT USERS: ', error);
    throw error;
  }
};

// const seedCompanies = () => {
//   try {
//     const companies = JSON.parse(
//       fs.readFileSync(path.join(__dirname, 'data', 'companies.json'), 'utf-8')
//     );
//   } catch (error) {

//   }
// };

const seedData = async () => {
  try {
    await seedRoles();
    await seedPermissions();
    await seedDefaultUsers();
  } catch (error) {
    console.log('SEEDING ERROR: ', error);
  } finally {
    console.log('Seeding Complete!!');
  }
};

export default seedData;

// const path = require('path');
// const fs = require('fs');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const Tour = require('./../models/tourModel');
// const Review = require('./../models/reviewModel');
// const User = require('../models/user.model');

// dotenv.config({ path: './config.env' });

// // const DB = process.env.DATABASE_LOCAL
// const DB = process.env.DATABASE_REMOTE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('DB connection successful!'));

// // READ JSON FILE
// const tours = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'tours.json'), 'utf-8'));
// const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'users.json'), 'utf-8'));
// const reviews = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'reviews.json'), 'utf-8'));

// // IMPORT DATA INTO DB
// const importData = async () => {
//   try {
//     await User.create(users, { validateBeforeSave: false }); // You can turn off create/save validation
//     await Tour.create(tours);
//     await Review.create(reviews);
//     console.log('Data successfully loaded!');
//   } catch (err) {
//     console.log(err);
//   }

//   process.exit();
// };

// // DELETE ALL DATA FROM DB
// const deleteData = async () => {
//   try {
//     await Tour.deleteMany();
//     await User.deleteMany();
//     await Review.deleteMany();
//     console.log('Data successfully deleted!');
//   } catch (err) {
//     console.log(err);
//   }

//   process.exit();
// };

// if (process.argv[2] === '--import') {
//   importData();
// } else if (process.argv[2] === '--delete') {
//   deleteData();
// }
