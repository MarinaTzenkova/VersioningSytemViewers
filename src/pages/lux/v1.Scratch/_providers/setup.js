import withScans from "./withScans";
import withVersion from "./withVersion";
import withMetadata from "./withMetadata";
import withTabs from "./withTabs";
import withProcessedConfluence from "./withProcessedConfluence";
import withProcessedImages from "./withProcessedImages";
import withProcessedScratch from "./withProcessedScratch";

export default function(experimentId, version, endpoint) {
  // no details, notes, notifications, logboock, tags sorry
  // for now only confluence is supported (specifi or latest)
  const { timepoints, setTimepoint } = withScans(experimentId, endpoint);

  const { versionOfData } = withVersion(experimentId, version, endpoint);

  const { metadata } = withMetadata(experimentId, versionOfData, endpoint);
  const { tabs, setTab } = withTabs(versionOfData);
  // with scans and extract timepoints
  const { coverage } = withProcessedConfluence(
    experimentId,
    versionOfData,
    endpoint
  );

  const { scratch } = withProcessedScratch(
    experimentId,
    versionOfData,
    endpoint
  );
  const { images } = withProcessedImages(
    experimentId,
    versionOfData,
    timepoints,
    endpoint
  );

  // tabs must include original and algorithms but if only they are added?

  return {
    timepoints,
    setTimepoint,
    versionOfData,
    metadata,
    coverage,
    scratch,
    images,
    tabs,
    setTab
  };
}
