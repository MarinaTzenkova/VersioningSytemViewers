import withScans from "./withScans";
import withInputMetadata from "./withInputMetadata";
import withLatest from "./withLatest";
import withMetadata from "./withMetadata";
import withTabs from "./withTabs";
import withProcessedImages from "./withProcessedImages";
import withProcessedConfluence from "./withProcessedConfluence";
import withProcessedScratch from "./withProcessedScratch";
import withChannels from "./withChannels";
import withOverlaySettings from "./withOverlaySettings";
import withVersions from "./withVersions";

export default function(experimentId, version, endpoint) {
  // 1. Input first (scans + input data structure)
  const { timepoints, setTimepoint } = withScans(experimentId, endpoint);

  // 2. All channels and algorithms of experiment
  const { input } = withInputMetadata(experimentId, endpoint);

  // 3. Version of data after that
  const { latestVersionOfProcessedData } = withLatest(
    experimentId,
    version,
    endpoint,
    input
  );

  // 4. Metadata of version
  const { metadata } = withMetadata(
    experimentId,
    latestVersionOfProcessedData,
    input,
    endpoint
  );

  const { versions } = withVersions(experimentId, input, metadata);

  // 5. Tabs (refactor) to use input
  const { tabs, setTab } = withTabs(latestVersionOfProcessedData);

  // 6. Images
  const { images } = withProcessedImages(
    experimentId,
    latestVersionOfProcessedData,
    timepoints,
    endpoint
  );

  // 7. Confluence and Scratch
  const { confluence } = withProcessedConfluence(
    experimentId,
    latestVersionOfProcessedData,
    endpoint
  );

  const { scratch } = withProcessedScratch(
    experimentId,
    latestVersionOfProcessedData,
    endpoint
  );

  // 8. Channels
  const { channels } = withChannels(input, tabs);

  // 9. Settings
  const { settings, saveOptions } = withOverlaySettings(versions);

  return {
    timepoints,
    setTimepoint,
    input,
    metadata,
    tabs,
    setTab,
    images,
    confluence,
    scratch,
    channels,
    settings,
    saveOptions,
    latestVersionOfProcessedData
  };
}
