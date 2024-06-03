import React from "react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";

type TType = {
  defaultLayout?: number[] | undefined;
  leftPanel?: React.ReactNode;
  cnterPanel?: React.ReactNode;
  rightPanel?: React.ReactNode;
};

const ResizeablePanel = ({
  leftPanel,
  cnterPanel,
  rightPanel,

  defaultLayout = [20, 55, 25],
}: TType) => {
  const onLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
  };
  return (
    <PanelGroup
      direction="horizontal"
      onLayout={onLayout}
      autoSaveId="condition"
    >
      <Panel collapsible={true} minSize={17}>
          {leftPanel}
      </Panel>
      <PanelResizeHandle className="border-r-2 h-screen bg-slate-400" />

      <Panel defaultSize={defaultLayout[1]}>{cnterPanel}</Panel>
      <PanelResizeHandle className="border-r-2 h-screen bg-slate-400" />
      <Panel collapsible={true} minSize={20} defaultSize={defaultLayout[2]}>
        {rightPanel}
      </Panel>
    </PanelGroup>
  );
};

export default ResizeablePanel;
