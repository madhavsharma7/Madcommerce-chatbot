const NavLink = ({ children, href, className = "" }) => {
  return (
    <a
      href={href}
      className={`text-sm font-medium text-muted-foreground hover:text-primary transition-colors ${className}`}
    >
      {children}
    </a>
  );
};

export default NavLink;
