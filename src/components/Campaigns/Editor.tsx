import createStudioEditor from "@grapesjs/studio-sdk";
import {
  canvasEmptyState,
  layoutSidebarButtons,
  rteProseMirror,
} from "@grapesjs/studio-sdk-plugins";
import "@grapesjs/studio-sdk/style";

// ...once the '#studio-editor' DOM element is rendered
export const Editor = createStudioEditor({
  root: "#studio-editor",
  licenseKey:
    "b669eb6e18ee45ac8a8ff765b48fbd9640c1d903f8e2426b878da84b172caf55",
  project: {
    type: "email",
    // TODO: replace with a unique id for your projects. e.g. an uuid
    id: "UNIQUE_PROJECT_ID",
  },
  identity: {
    // TODO: replace with a unique id for your end users. e.g. an uuid
    id: "UNIQUE_END_USER_ID",
  },
  assets: {
    storageType: "cloud",
  },
  storage: {
    type: "cloud",
    autosaveChanges: 100,
    autosaveIntervalMs: 10000,
  },
  plugins: [
    rteProseMirror.init({
      /* Plugin options: https://app.grapesjs.com/docs-sdk/plugins/rte/prosemirror */
    }),
    canvasEmptyState.init({
      /* Plugin options: https://app.grapesjs.com/docs-sdk/plugins/canvas/emptyState */
    }),
    layoutSidebarButtons.init({
      /* Plugin options: https://app.grapesjs.com/docs-sdk/plugins/layout/sidebar-buttons */
    }),
  ],
});
