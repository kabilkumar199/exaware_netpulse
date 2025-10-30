// Route configuration for better maintainability
export const ROUTES = {
  // Auth
  AUTH: {
    LOGIN: "/login",
  },
  // Main routes
  DASHBOARD: "/dashboard",
  DEVICES: "/devices",
  DISCOVERY: "/discovery",
  TOPOLOGY: "/topology",

  // Organization routes
  ORGANIZATION: {
    BASE: "/organization",
    REGIONS: "/organization/regions",
    SITES: "/organization/sites",
    LOCATIONS: "/organization/locations",
    MANUFACTURERS: "/organization/manufacturers",
    RACKS: "/organization/racks",
    DEVICE_ROLES: "/organization/device-roles",
  },

  // Monitoring routes
  MONITORING: {
    BASE: "/monitoring",
    PERFORMANCE: "/monitoring/performance",
    TRAFFIC: "/monitoring/traffic",
    WIRELESS: "/monitoring/wireless",
    APPLICATIONS: "/monitoring/applications",
    CLOUD: "/monitoring/cloud",
    LOGS: "/monitoring/logs",
    GRAFANA: "/monitoring/grafana",
  },

  // Management routes
  MANAGEMENT: {
    BASE: "/management",
    CONFIGURATION: "/management/configuration",
    BACKUPS: "/management/backups",
    FIRMWARE: "/management/firmware",
    ALERTS: "/management/alerts",
    USERS: "/management/users",
    ROLES: "/management/roles",
    PROFILE: "/management/profile",
  },

  // Settings routes
  SETTINGS: {
    BASE: "/settings",
    CREDENTIALS: "/settings/credentials",
    GRAFANA: "/settings/grafana",
    L2_SERVICES: "/settings/l2-services",
  },

  // Direct component routes
  COMPONENTS: {
    DEVICE_DETAILS: "/device/:id",
    DISCOVERY_WIZARD: "/discovery/wizard",
    NETBOX_IMPORTER: "/discovery/netbox",
    TOPOLOGY_VIEW: "/topology/view",
  },
} as const;

// Navigation items for sidebar
export const NAVIGATION_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: ROUTES.DASHBOARD,
    icon: "dashboard",
  },
  {
    id: "discovery",
    label: "Discovery",
    path: ROUTES.DISCOVERY,
    icon: "search",
    children: [
      { id: "new-scan", label: "New Scan", path: ROUTES.DISCOVERY },
      { id: "scan-history", label: "Scan History", path: ROUTES.DISCOVERY },
    ],
  },
  {
    id: "inventory",
    label: "Inventory",
    path: ROUTES.DEVICES,
    icon: "server",
  },
  {
    id: "topology",
    label: "Topology",
    path: ROUTES.TOPOLOGY,
    icon: "network",
  },
  {
    id: "organization",
    label: "Organization",
    path: ROUTES.ORGANIZATION.BASE,
    icon: "building-2",
    children: [
      { id: "regions", label: "Regions", path: ROUTES.ORGANIZATION.REGIONS },
      { id: "sites", label: "Sites", path: ROUTES.ORGANIZATION.SITES },
      {
        id: "locations",
        label: "Locations",
        path: ROUTES.ORGANIZATION.LOCATIONS,
      },
      {
        id: "manufacturers",
        label: "Manufacturers",
        path: ROUTES.ORGANIZATION.MANUFACTURERS,
      },
      { id: "racks", label: "Racks", path: ROUTES.ORGANIZATION.RACKS },
      {
        id: "device-roles",
        label: "Device Roles",
        path: ROUTES.ORGANIZATION.DEVICE_ROLES,
      },
    ],
  },
  {
    id: "monitoring",
    label: "Monitoring",
    path: ROUTES.MONITORING.BASE,
    icon: "activity",
    children: [
      {
        id: "performance",
        label: "Performance",
        path: ROUTES.MONITORING.PERFORMANCE,
      },
      {
        id: "traffic",
        label: "Traffic Analysis",
        path: ROUTES.MONITORING.TRAFFIC,
      },
      { id: "wireless", label: "Wireless", path: ROUTES.MONITORING.WIRELESS },
      {
        id: "applications",
        label: "Applications",
        path: ROUTES.MONITORING.APPLICATIONS,
      },
      { id: "cloud", label: "Cloud Resources", path: ROUTES.MONITORING.CLOUD },
      { id: "logs", label: "Log Management", path: ROUTES.MONITORING.LOGS },
      { id: "grafana", label: "Grafana", path: ROUTES.MONITORING.GRAFANA },
    ],
  },
  {
    id: "management",
    label: "Management",
    path: ROUTES.MANAGEMENT.BASE,
    icon: "wrench",
    children: [
      {
        id: "configuration",
        label: "Configuration",
        path: ROUTES.MANAGEMENT.CONFIGURATION,
      },
      { id: "backups", label: "Backups", path: ROUTES.MANAGEMENT.BACKUPS },
      { id: "firmware", label: "Firmware", path: ROUTES.MANAGEMENT.FIRMWARE },
      { id: "alerts", label: "Alerts", path: ROUTES.MANAGEMENT.ALERTS },
      { id: "users", label: "Users", path: ROUTES.MANAGEMENT.USERS },
      { id: "roles", label: "Roles", path: ROUTES.MANAGEMENT.ROLES },
      { id: "profile", label: "Profile", path: ROUTES.MANAGEMENT.PROFILE },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    path: ROUTES.SETTINGS.BASE,
    icon: "settings",
    children: [
      {
        id: "credentials",
        label: "Credentials",
        path: ROUTES.SETTINGS.CREDENTIALS,
      },
      { id: "grafana", label: "Grafana", path: ROUTES.SETTINGS.GRAFANA },
      {
        id: "l2-services",
        label: "L2 Services",
        path: ROUTES.SETTINGS.L2_SERVICES,
      },
    ],
  },
] as const;
