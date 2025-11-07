import FilterBar from '../FilterBar';

export default function FilterBarExample() {
  return (
    <FilterBar
      onLevelChange={(level) => console.log('Level changed:', level)}
      onStatusChange={(status) => console.log('Status changed:', status)}
      onSearchChange={(search) => console.log('Search changed:', search)}
      onExport={() => console.log('Export triggered')}
    />
  );
}
