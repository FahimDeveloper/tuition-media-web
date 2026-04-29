import {AndroidOutlined, AppleOutlined} from '@ant-design/icons';
import {Tabs} from 'antd';
import BasicTables from '../demo/Tables/BasicTables';

const ExampleChildren = () => {
  return (
    <div className="space-y-4">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
        veniam eaque, doloribus ex magni sint a qui, nisi cum nostrum,
        architecto incidunt? Cum, vero! Consequatur accusantium officiis beatae
        repudiandae et.
      </p>
      <p>Tab 2</p>
      <p>Tab 3</p>
    </div>
  );
};

const historyNavs = [
  {
    label: 'Tab 1',
    icon: <AndroidOutlined />,
    children: <BasicTables />,
  },
  {
    label: 'Tab 2',
    icon: <AppleOutlined />,
    children: <ExampleChildren />,
  },
];

const CurrentStatus = () => (
  <Tabs
    className=""
    defaultActiveKey="2"
    items={historyNavs.map((nav, i) => {
      const id = String(i + 1);
      return {
        key: id,
        label: nav.label,
        children: nav.children,
        icon: nav.icon,
      };
    })}
  />
);

export default CurrentStatus;
