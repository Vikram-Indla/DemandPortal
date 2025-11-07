import HierarchyTree, { TreeNode } from '../HierarchyTree';

const mockTreeData: TreeNode[] = [
  {
    id: 'feat-1',
    title: 'User Authentication',
    type: 'feature',
    status: 'in-progress',
    priority: 'high',
    releaseLabel: 'Q1 2025',
    completionPercentage: 75,
    children: [
      {
        id: 'epic-1',
        title: 'SSO Integration',
        type: 'epic',
        status: 'done',
        priority: 'high',
        completionPercentage: 100,
      },
    ],
  },
];

export default function HierarchyTreeExample() {
  return (
    <div className="h-96">
      <HierarchyTree
        nodes={mockTreeData}
        onNodeClick={(node) => console.log('Node clicked:', node)}
      />
    </div>
  );
}
