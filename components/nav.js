
'use client';

import { Avatar, Dropdown, Navbar } from 'flowbite-react';

export default function Nav() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Frames</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/">Home</Navbar.Link>
        <Navbar.Link href="/explore">Explore</Navbar.Link>
        <Navbar.Link href="/create">Create</Navbar.Link>
        <Navbar.Link href="/profile">Profile</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
