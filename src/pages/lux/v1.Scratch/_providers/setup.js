import withScans from "./withScans";
import withVersion from "./withVersion";
import withTabs from "./withTabs";
import withProcessedData from "./withProcessedData";
import withProcessedImages from "./withProcessedImages";

export default function(experimentId, version, endpoint) {
  // no details, notes, notifications, logboock, tags sorry
  // for now only confluence is supported (specifi or latest)
  const { timepoints, setTimepoint } = withScans(experimentId, endpoint);

  const { versionOfData } = withVersion(experimentId, version, endpoint);
  const { tabs, setTab } = withTabs(versionOfData);
  // with scans and extract timepoints
  const { coverage } = withProcessedData(experimentId, versionOfData, endpoint);
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
    coverage,
    images,
    tabs,
    setTab
  };
}
