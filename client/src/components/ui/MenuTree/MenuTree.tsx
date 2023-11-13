import { IoCaretDownSharp, IoCaretForwardSharp } from 'react-icons/io5';
import { useState } from 'react';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

export type MenuProps = {
  isActive?: boolean;
  to: string;
  title: string;
  icon?: IconType;
  children?: MenuProps[];
};

type MenuTreeItemProps = MenuProps & {
  depth: number;
};

type MenuTreeProps = {
  data: MenuProps[];
  pathname?: string;
};

const MenuTreeItem = ({
  title,
  icon: Icon,
  to,
  isActive,
  children,
  depth,
}: MenuTreeItemProps) => {
  const [showChildren, setShowChildren] = useState(false);
  const hasChildren = children && children.length > 0;
  const className = `flex items-center gap-3 cursor-pointer text-sm text-slate-800 p-2 ${
    isActive ? 'bg-indigo-100 text-indigo-600 rounded-md' : ''
  }`;
  const itemContent = (
    <>
      {Icon && <Icon className='text-indigo-600' size={18} />}
      {title}
      {hasChildren &&
        (showChildren ? <IoCaretDownSharp /> : <IoCaretForwardSharp />)}
    </>
  );
  return (
    <>
      {(!hasChildren && to) || to === '' ? (
        <Link className={className} to={to}>
          {itemContent}
        </Link>
      ) : (
        <div
          onClick={() => setShowChildren((prev) => !prev)}
          style={{ paddingLeft: `${depth}rem` }}
          className={className}
        >
          {itemContent}
        </div>
      )}
      {hasChildren && showChildren && (
        <div>
          {children.map((child, i) => (
            <MenuTreeItem
              key={i}
              depth={depth + 1}
              title={child.title}
              to={child.to}
              children={child.children}
            />
          ))}
        </div>
      )}
    </>
  );
};

const MenuTree = ({ data, pathname }: MenuTreeProps) => {
  return (
    <ul>
      {data.map((datum, i) => (
        <MenuTreeItem
          key={i}
          depth={1.5}
          {...datum}
          isActive={pathname === datum.to}
        />
      ))}
    </ul>
  );
};

export default MenuTree;
