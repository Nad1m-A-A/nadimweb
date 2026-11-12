export type SiteNavLink = {
  id: string;
  label: string;
};

export type SiteNavProps = {
  links: readonly SiteNavLink[];
};

export type SiteMobileNavProps = {
  links: readonly SiteNavLink[];
};

export type SiteHeaderProps = {
  links: readonly SiteNavLink[];
  /** Show the Contact button. */
  contact?: boolean;
  /** Show GitHub and LinkedIn. */
  social?: boolean;
};
