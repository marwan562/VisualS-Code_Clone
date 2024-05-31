import React from "react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";

type TType = {
  defaultLayout?: number[] | undefined;
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  showLeftPanel: boolean;
};

const ResizeablePanel = ({
  leftPanel,
  rightPanel,
  showLeftPanel,
  defaultLayout = [33, 67],
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
      {showLeftPanel && (
        <>
          <Panel collapsible={true} minSize={17}>
            {leftPanel}
          </Panel>
          <PanelResizeHandle className="border-r-2 h-screen bg-slate-400" />
        </>
      )}

      <Panel defaultSize={defaultLayout[1]}>{rightPanel}</Panel>
    </PanelGroup>
  );
};

export default ResizeablePanel;
