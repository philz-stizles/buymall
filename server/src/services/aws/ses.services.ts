import * as AWS from '@aws-sdk/client-ses';

export const sendAccountActivationMail = async (
  email: string,
  token: string
): Promise<AWS.SendEmailCommandOutput | undefined> => {
  try {
    const params: AWS.SendEmailCommandInput = {
      Source: process.env.ADMIN_EMAIL as string,
      Destination: {
        ToAddresses: [email],
      },
      ReplyToAddresses: [process.env.ADMIN_EMAIL as string],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `
                        <html>
                            <h1>Verify your email address</h1>
                            <p>Please use the following link to complete your registration:</p>
                            <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                        </html>
                    `,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Complete your registration',
        },
      },
    };
    const ses = new AWS.SESClient({ region: 'Your AWS region' });
    const command = new AWS.SendEmailCommand(params);
    const sesResult = await ses.send(command);
    return sesResult;
  } catch (error) {
    console.error(error);
  }
};

export const sendPasswordResetMail = async (
  email: string,
  token: string
): Promise<AWS.SendEmailCommandOutput | undefined> => {
  try {
    const params: AWS.SendEmailCommandInput = {
      Source: process.env.ADMIN_EMAIL as string,
      Destination: {
        ToAddresses: [email],
      },
      ReplyToAddresses: [process.env.ADMIN_EMAIL as string],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `
                        <html>
                            <h1>Reset your password</h1>
                            <p>Please use the following link to reset your password:</p>
                            <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
                        </html>
                    `,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Password reset link',
        },
      },
    };
    const ses = new AWS.SESClient({ region: 'Your AWS region' });
    const command = new AWS.SendEmailCommand(params);
    const sesResult = await ses.send(command);
    return sesResult;
  } catch (error) {
    console.error(error);
  }
};

// export const sendCategorySubscriptionMail = (email: string, data: any) => {
//   const params: SES.SendEmailRequest = {
//     Source: process.env.ADMIN_EMAIL as string,
//     Destination: {
//       ToAddresses: [email],
//     },
//     ReplyToAddresses: [process.env.ADMIN_EMAIL as string],
//     Message: {
//       Body: {
//         Html: {
//           Charset: 'UTF-8',
//           Data: `
//                         <html>
//                             <h1>New link published | </h1>
//                             <p>A new link titled <b>${
//                               data.title
//                             }</b> has been published in the following categories:</p>
//                             ${data.categories
//                               .map(({ name, image, slug }) => {
//                                 return `
//                                     <div>
//                                         <h2>${name}</h2>
//                                         <img src="${image.url}" alt="${name}" style="height: 50px;" />
//                                         <h3><a href="${process.env.CLIENT_URL}/links/${slug}">Check it out</a></h3>
//                                     </div>
//                                 `;
//                               })
//                               .join(`---------------------------`)}

//                             <p>Do not want to receive notifications?</p>
//                             <p>Turn off notification from your <b>dashboard</b> > <b>update profile</b> and <b>uncheck the categories</b></p>
//                             <p>${process.env.CLIENT_URL}/user/profile/update</p>
//                             </html>
//                     `,
//         },
//       },
//       Subject: {
//         Charset: 'UTF-8',
//         Data: 'New link published',
//       },
//     },
//   };

//   return ses.sendEmail(params).promise();
// };
