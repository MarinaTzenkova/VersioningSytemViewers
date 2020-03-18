import withVersions from "./withVersions";
import withMetadata from "./withMetadata";

export default function(experimentId, endpoint) {
  const { versions, fetchVersions } = withVersions(experimentId, endpoint);
  const { metadata } = withMetadata(experimentId, versions, endpoint);

  fetchVersions();

  function lux2(version) {
    window.location.href = `/${experimentId}/lux2?version=${version}`;
  }

  function lux3(version) {
    window.location.href = `/${experimentId}/lux3?version=${version}`;
  }
  return {
    versions,
    metadata,
    lux2,
    lux3
  };
}
