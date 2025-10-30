# DataTable Component

A comprehensive, reusable table component with advanced features including filtering, sorting, pagination, and bulk actions.

## Features

- **Flexible Column Configuration**: Define custom renderers, sorting, and filtering for each column
- **Advanced Filtering**: Support for text, select, multiselect, date, and date range filters
- **Sorting**: Click-to-sort functionality with visual indicators
- **Pagination**: Configurable pagination with page size options and quick jumper
- **Search**: Global search across searchable columns
- **Bulk Actions**: Row selection with bulk action support
- **Loading States**: Built-in loading skeleton and states
- **Empty States**: Customizable empty state messages and icons
- **Responsive Design**: Mobile-friendly with horizontal scrolling
- **TypeScript Support**: Full type safety with generic types

## Basic Usage

```tsx
import { DataTable, type TableColumn, type FilterConfig } from '../ui';

interface MyData {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  createdAt: Date;
}

const columns: TableColumn<MyData>[] = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
    searchable: true
  },
  {
    key: 'status',
    title: 'Status',
    sortable: true,
    filterable: true,
    render: (value) => <StatusBadge status={value} />
  },
  {
    key: 'createdAt',
    title: 'Created',
    sortable: true,
    render: (value) => formatDate(value)
  }
];

const filters: FilterConfig[] = [
  {
    key: 'status',
    type: 'select',
    label: 'Status',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' }
    ]
  }
];

<DataTable
  data={myData}
  columns={columns}
  filters={filters}
  searchable={true}
  pagination={{
    enabled: true,
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: [10, 25, 50, 100]
  }}
  onRowClick={(item) => console.log('Clicked:', item)}
  onRefresh={() => console.log('Refreshing...')}
  onExport={() => console.log('Exporting...')}
/>
```

## Column Configuration

### TableColumn Interface

```tsx
interface TableColumn<T> {
  key: keyof T | string;           // Data key or custom identifier
  title: string;                   // Column header text
  render?: (value: any, item: T, index: number) => React.ReactNode;
  sortable?: boolean;              // Enable sorting
  filterable?: boolean;            // Enable filtering
  searchable?: boolean;            // Include in global search
  className?: string;              // Custom cell styling
  headerClassName?: string;        // Custom header styling
  width?: string | number;         // Column width
  align?: 'left' | 'center' | 'right'; // Text alignment
}
```

### Column Examples

```tsx
// Basic text column
{
  key: 'name',
  title: 'Name',
  sortable: true,
  searchable: true
}

// Custom renderer with component
{
  key: 'status',
  title: 'Status',
  render: (value) => <StatusBadge status={value} />
}

// Complex cell with multiple elements
{
  key: 'device',
  title: 'Device',
  render: (value, item) => (
    <div className="flex items-center">
      <DeviceIcon vendor={item.vendor} />
      <div className="ml-4">
        <div className="font-medium">{item.hostname}</div>
        <div className="text-gray-400">{item.fqdn}</div>
      </div>
    </div>
  )
}

// Action buttons
{
  key: 'actions',
  title: 'Actions',
  render: (value, item) => (
    <ActionButtons
      actions={[
        {
          label: 'View',
          onClick: (e) => {
            e.stopPropagation();
            onView(item);
          },
          className: 'text-blue-400 hover:text-blue-300'
        },
        {
          label: 'Edit',
          onClick: (e) => {
            e.stopPropagation();
            onEdit(item);
          },
          className: 'text-gray-400 hover:text-gray-300'
        }
      ]}
    />
  )
}
```

## Filter Configuration

### FilterConfig Interface

```tsx
interface FilterConfig {
  key: string;                     // Data key to filter
  type: 'text' | 'select' | 'multiselect' | 'date' | 'daterange';
  label: string;                   // Filter label
  placeholder?: string;            // Placeholder text
  options?: Array<{ value: string; label: string }>; // For select/multiselect
  className?: string;              // Custom styling
}
```

### Filter Examples

```tsx
// Text filter
{
  key: 'vendor',
  type: 'text',
  label: 'Vendor',
  placeholder: 'Filter by vendor...'
}

// Single select filter
{
  key: 'status',
  type: 'select',
  label: 'Status',
  options: [
    { value: 'up', label: 'Up' },
    { value: 'down', label: 'Down' },
    { value: 'warning', label: 'Warning' }
  ]
}

// Multi-select filter
{
  key: 'roles',
  type: 'multiselect',
  label: 'Roles',
  options: [
    { value: 'router', label: 'Router' },
    { value: 'switch', label: 'Switch' },
    { value: 'firewall', label: 'Firewall' }
  ]
}
```

## Pagination Configuration

```tsx
interface PaginationConfig {
  enabled: boolean;                // Enable pagination
  pageSize: number;                // Items per page
  showSizeChanger: boolean;        // Show page size selector
  pageSizeOptions: number[];       // Available page sizes
  showQuickJumper: boolean;        // Show page input
  showTotal: boolean;              // Show total count
}

// Example
pagination={{
  enabled: true,
  pageSize: 10,
  showSizeChanger: true,
  pageSizeOptions: [10, 25, 50, 100],
  showQuickJumper: true,
  showTotal: true
}}
```

## Bulk Actions

```tsx
// Enable row selection
<DataTable
  selectable={true}
  selectedRows={selectedItems}
  onSelectionChange={setSelectedItems}
  bulkActions={
    <div className="flex space-x-2">
      <button onClick={handleBulkExport}>
        Export Selected
      </button>
      <button onClick={handleBulkDelete}>
        Delete Selected
      </button>
    </div>
  }
/>
```

## Event Handlers

```tsx
<DataTable
  onRowClick={(item, index) => console.log('Row clicked:', item)}
  onRowDoubleClick={(item, index) => console.log('Row double-clicked:', item)}
  onSort={(sortConfig) => console.log('Sort changed:', sortConfig)}
  onFilter={(filters) => console.log('Filters changed:', filters)}
  onSearch={(searchTerm) => console.log('Search changed:', searchTerm)}
  onRefresh={() => console.log('Refresh requested')}
  onExport={() => console.log('Export requested')}
/>
```

## Styling and Customization

### Row Styling

```tsx
<DataTable
  rowClassName={(item, index) => {
    if (item.priority === 'critical') return 'border-l-4 border-red-500';
    if (selectedItems.includes(item)) return 'bg-blue-900/20';
    return '';
  }}
/>
```

### Custom Empty State

```tsx
<DataTable
  emptyMessage="No data available"
  emptyIcon={<span className="text-4xl">📋</span>}
/>
```

### Loading State

```tsx
<DataTable
  loading={isLoading}
  // Shows skeleton loader when true
/>
```

## Utility Components

The DataTable package includes several utility components:

- **StatusBadge**: Pre-styled status indicators
- **DeviceIcon**: Vendor-specific device icons
- **ActionButtons**: Consistent action button groups
- **ProgressBar**: Progress indicators
- **Chip**: Tag/chip components
- **TableSkeleton**: Loading skeleton

## Advanced Examples

### Device List with Complex Data

```tsx
const deviceColumns: TableColumn<Device>[] = [
  {
    key: 'hostname',
    title: 'Device',
    sortable: true,
    searchable: true,
    render: (value, device) => (
      <div className="flex items-center">
        <DeviceIcon vendor={device.vendor} />
        <div className="ml-4">
          <div className="font-medium">{device.hostname}</div>
          <div className="text-gray-400">{device.fqdn}</div>
        </div>
      </div>
    )
  },
  {
    key: 'status',
    title: 'Status',
    sortable: true,
    filterable: true,
    render: (value) => <StatusBadge status={value} />
  },
  {
    key: 'ipAddresses',
    title: 'IP Addresses',
    searchable: true,
    render: (value) => (
      <div>
        {value.slice(0, 2).join(', ')}
        {value.length > 2 && (
          <span className="text-gray-400">
            +{value.length - 2} more
          </span>
        )}
      </div>
    )
  }
];
```

### Performance Monitoring Table

```tsx
const performanceColumns: TableColumn<PerformanceMetric>[] = [
  {
    key: 'deviceId',
    title: 'Device',
    render: (value, item) => <DeviceName deviceId={value} />
  },
  {
    key: 'cpu',
    title: 'CPU Usage',
    sortable: true,
    render: (value) => (
      <ProgressBar 
        value={value.usage} 
        max={100}
        showLabel={true}
      />
    )
  },
  {
    key: 'memory',
    title: 'Memory',
    render: (value) => (
      <div>
        <div>{formatBytes(value.used)} / {formatBytes(value.total)}</div>
        <ProgressBar value={value.usage} max={100} />
      </div>
    )
  }
];
```

## Best Practices

1. **Use TypeScript**: Always define proper types for your data
2. **Optimize Renders**: Use `useMemo` for expensive calculations
3. **Handle Loading**: Always show loading states for async operations
4. **Accessibility**: Ensure proper ARIA labels and keyboard navigation
5. **Performance**: Use pagination for large datasets
6. **Consistent Styling**: Use the provided utility components for consistency

## Migration from Basic Table

If you're migrating from the basic Table component:

1. Replace `Table` with `DataTable`
2. Convert your data structure to use `TableColumn` configuration
3. Add filter configuration if needed
4. Configure pagination settings
5. Add event handlers for interactions

The DataTable component is fully backward compatible and provides a much richer feature set for complex data display needs.
