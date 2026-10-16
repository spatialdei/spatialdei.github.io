(() => {
  const origin = 'Riverside Convention Center, 3637 Fifth Street, Riverside, CA 92501';
  const originCoordinates = '33.98524,-117.37153';
  const links = document.querySelectorAll('.route-link');
  const routeUrl = (link) => {
    const lat = Number(link.dataset.lat);
    const lon = Number(link.dataset.lon);
    const mode = link.dataset.mode === 'walking' ? 'walking' : 'driving';
    const route = link.dataset.route;
    const destination = link.dataset.place;
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return link.href;
    if (route === 'apple') {
      const params = new URLSearchParams({
        saddr: origin,
        daddr: destination,
        dirflg: mode === 'walking' ? 'w' : 'd'
      });
      return `https://maps.apple.com/?${params}`;
    }
    if (route === 'osm') {
      const params = new URLSearchParams({
        engine: mode === 'walking' ? 'fossgis_osrm_foot' : 'fossgis_osrm_car',
        route: `${originCoordinates};${lat},${lon}`
      });
      return `https://www.openstreetmap.org/directions?${params}`;
    }
    // Keep the confirmed Google Maps place-name and place-ID route intact.
    return link.href;
  };
  links.forEach((link) => {
    link.dataset.origin = origin;
    link.href = routeUrl(link);
  });
})();
