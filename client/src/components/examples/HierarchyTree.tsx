import HierarchyTree, { TreeNode } from '../HierarchyTree';

const mockTreeData: TreeNode[] = [
  {
    id: 'theme-1',
    title: 'Digital Transformation Initiative',
    type: 'theme',
    status: 'in-progress',
    children: [
      {
        id: 'init-1',
        title: 'Customer Portal Modernization',
        type: 'initiative',
        status: 'in-progress',
        children: [
          {
            id: 'br-1',
            title: 'New Authentication System',
            type: 'br',
            status: 'in-progress',
            children: [
              {
                id: 'epic-1',
                title: 'SSO Integration',
                type: 'epic',
                status: 'done',
                children: [
                  {
                    id: 'feature-1',
                    title: 'OAuth2 Provider Setup',
                    type: 'feature',
                    status: 'done',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'theme-2',
    title: 'Infrastructure Optimization',
    type: 'theme',
    status: 'not-started',
    children: [
      {
        id: 'init-2',
        title: 'Cloud Migration',
        type: 'initiative',
        status: 'not-started',
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
