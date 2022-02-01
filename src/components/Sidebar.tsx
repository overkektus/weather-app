import React from 'react';
import { HomeIcon, ChartBarIcon, MapIcon, CalendarIcon, CogIcon } from '@heroicons/react/outline';

const links = [
  {
    title: 'Dashboard',
    href: '#',
    icon: <HomeIcon/>
  },
  {
    title: 'Statistics',
    href: '#',
    icon: <ChartBarIcon/>
  },
  {
    title: 'Map',
    href: '#',
    icon: <MapIcon/>
  },
  {
    title: 'Calendar',
    href: '#',
    icon: <CalendarIcon/>
  },
  {
    title: 'Setting',
    href: '#',
    icon: <CogIcon/>
  }
];

export declare interface SidebarItemProps {
  href: string;
  // icon: ;
  title: string;
}

const SidebarItem = ({ href, icon, title }: SidebarItemProps) => (
  <a href={href} className='flex items-center space-x-2 py-2 px-4'>
    <div className='w-8 h-8'>
      {icon}
    </div>
    <span>{title}</span>
  </a>
)


const Sidebar = () => {
  return (
    <div className="bg-blue-800 text-blue-100 w-64 space-y-6">
      logo
      <nav>
        {links.map(link => <SidebarItem key={link.title} href={link.href} icon={link.icon} title={link.title} />)}
      </nav>
    </div>
  );
};

export default Sidebar;