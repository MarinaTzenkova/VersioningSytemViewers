import withVersion from "./withVersion";
import withProcessedData from "./withProcessedData";
import withProcessedImages from "./withProcessedImages";

export default function(experimentId, version) {
  // no details, notes, notifications, logboock, tags sorry
  // with composition api the page version can be flexible i think
  const { versionOfData } = withVersion(experimentId, version);
  // with scans and extract timepoints
  const { coverage } = withProcessedData(experimentId, versionOfData);
  const { images } = withProcessedImages(experimentId, versionOfData, coverage);

  return {
    versionOfData,
    coverage,
    images
  };
}
