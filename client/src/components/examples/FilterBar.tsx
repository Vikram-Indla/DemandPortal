import FilterBar from '../FilterBar';

export default function FilterBarExample() {
  return (
    <FilterBar
      onLevelChange={(level) => console.log('Level changed:', level)}
      onStatusChange={(status) => console.log('Status changed:', status)}
      onPriorityChange={(priority) => console.log('Priority changed:', priority)}
      onReleaseChange={(release) => console.log('Release changed:', release)}
      onSearchChange={(search) => console.log('Search changed:', search)}
      onExport={() => console.log('Export triggered')}
      releases={['Q1 2025', 'Q2 2025', 'Q3 2025']}
    />
  );
}
