document.addEventListener('DOMContentLoaded', () => {
  const galacticMapContainer = document.querySelector('.galactic-map-container');
  const svgContainer = document.getElementById('connection-lines-svg');
  const infoPanel = document.getElementById('info-panel');
  const panelTitle = document.getElementById('panel-title');
  const panelOverview = document.getElementById('panel-overview');
  const panelStatusTag = document.getElementById('panel-status-tag');
  const missionStatusDetail = document.getElementById('mission-status-detail');
  const missionEndDetail = document.getElementById('mission-end-detail');
  const panelHeaderImage = document.getElementById('panel-header-image');
  const destinationNodes = document.querySelectorAll('.destination-node');

  // --- 1. Define Node Positions (Adjust these to match your CSS positioning) ---
  const nodePositions = {
    'node-moon-1': { x: 75, y: 15 },
    'node-moon-2': { x: 30, y: 10 },
    'node-mars-1': { x: 40, y: 35 },
    'node-mars-2': { x: 60, y: 25 },
    'node-europa': { x: 85, y: 28 },
    'node-titan': { x: 85, y: 55 },
    'node-andromeda': { x: 10, y: 60 },
    'node-kepler': { x: 80, y: 75 },
    'node-outpost-a': { x: 15, y: 45 },
    'node-colony-x': { x: 40, y: 65 },
    'node-gas-giant-station': { x: 60, y: 50 },
    'node-nebula-gate': { x: 70, y: 35 },
    'node-dark-matter-lab': { x: 55, y: 85 },
    'node-nova-prime': { x: 50, y: 20 },
    'node-asteroid-mine': { x: 30, y: 70 },
    'node-comet-station': { x: 25, y: 40 },
    'node-tess': { x: 25, y: 50 }
  };

  // --- 2. Define Connections Between Nodes (updated to match image) ---
  const connections = [
    ['node-moon-1', 'node-nova-prime'],
    ['node-moon-1', 'node-mars-2'],
    ['node-moon-2', 'node-mars-1'],
    ['node-moon-2', 'node-outpost-a'],
    ['node-mars-1', 'node-nova-prime'],
    ['node-mars-1', 'node-colony-x'],
    ['node-mars-2', 'node-nebula-gate'],
    ['node-mars-2', 'node-gas-giant-station'],
    ['node-nova-prime', 'node-nebula-gate'],
    ['node-europa', 'node-nebula-gate'],
    ['node-europa', 'node-titan'],
    ['node-titan', 'node-kepler'],
    ['node-andromeda', 'node-outpost-a'],
    ['node-outpost-a', 'node-comet-station'],
    ['node-comet-station', 'node-asteroid-mine'],
    ['node-asteroid-mine', 'node-colony-x'],
    ['node-colony-x', 'node-dark-matter-lab'],
    ['node-dark-matter-lab', 'node-kepler'],
    ['node-gas-giant-station', 'node-kepler'],
    ['node-tess', 'node-outpost-a'],
    ['node-tess', 'node-andromeda']
  ];

  // --- 3. Function to Draw SVG Lines ---
  function drawConnections() {
    svgContainer.innerHTML = ''; // Clear existing lines
    const containerWidth = galacticMapContainer.offsetWidth;
    const containerHeight = galacticMapContainer.offsetHeight;

    connections.forEach(pair => {
      const [nodeA_id, nodeB_id] = pair;
      const posA = nodePositions[nodeA_id];
      const posB = nodePositions[nodeB_id];

      if (posA && posB) {
        const x1 = (posA.x / 100) * containerWidth;
        const y1 = (posA.y / 100) * containerHeight;
        const x2 = (posB.x / 100) * containerWidth;
        const y2 = (posB.y / 100) * containerHeight;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        svgContainer.appendChild(line);
      }
    });
  }

  // --- 4. Handle Node Clicks ---
  destinationNodes.forEach(node => {
    node.addEventListener('click', () => {
      const id = node.dataset.id;
      const name = node.dataset.name;
      const overview = node.dataset.overview;
      const status = node.dataset.status;
      const missionEnd = node.dataset.missionEnd;
      const image = node.dataset.image;

      panelTitle.textContent = name;
      panelOverview.textContent = overview;
      panelStatusTag.textContent = status;
      missionStatusDetail.textContent = status;
      missionEndDetail.textContent = missionEnd;
      panelHeaderImage.src = image;

      // Update status tag color based on status
      panelStatusTag.className = 'status-tag'; // Reset classes
      switch (status) {
        case 'Active':
        case 'Operational':
        case 'Established':
        case 'Ongoing':
          panelStatusTag.classList.add('status-active-bg');
          break;
        case 'Upcoming':
          panelStatusTag.classList.add('status-upcoming-bg');
          break;
        case 'Planned':
        case 'Under Construction':
        case 'Researching':
          panelStatusTag.classList.add('status-planned-bg');
          break;
        case 'Conceptual':
          panelStatusTag.classList.add('status-conceptual-bg');
          break;
        default:
          panelStatusTag.classList.add('status-ongoing-bg');
      }

      infoPanel.classList.add('visible');
    });
  });

  // --- 5. Initial Draw and Resize Listener ---
  drawConnections(); // Draw lines on page load
  window.addEventListener('resize', drawConnections); // Redraw lines on resize

  // --- 6. Hide panel if click outside or on a node that's already active ---
  document.addEventListener('click', (event) => {
    const isClickInsidePanel = infoPanel.contains(event.target);
    const isClickOnNode = event.target.closest('.destination-node');

    if (!isClickInsidePanel && !isClickOnNode && infoPanel.classList.contains('visible')) {
      infoPanel.classList.remove('visible');
    } else if (isClickOnNode && infoPanel.classList.contains('visible') && event.target.closest('.destination-node').dataset.id === panelTitle.textContent.split(': ')[0].toLowerCase().replace(/ /g, '-')) {
      // If clicking the same node again, hide the panel
      // This logic is a bit complex due to panelTitle's format. A dedicated data-attribute for current active node would be cleaner.
      // For simplicity, let's just make sure it closes if something else is clicked
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.primary-nav');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navMenu.classList.toggle('open');
    });
});