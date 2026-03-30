import React, { useState } from 'react';
import Bugsnag from '@bugsnag/js';

function InsectGuide() {
  const [error, setError] = useState(null);

  const insectInfo = [
    {
      name: 'Butterflies',
      emoji: '🦋',
      description: 'Colorful winged insects known for pollination. Best found in gardens and meadows during warm days.',
      tips: 'Use a net and approach slowly. They are most active during sunny afternoons.'
    },
    {
      name: 'Beetles',
      emoji: '🪲',
      description: 'Hard-shelled insects with diverse species. Found under logs, rocks, and in soil.',
      tips: 'Look under bark and in decaying wood. Night time is best for finding nocturnal species.'
    },
    {
      name: 'Dragonflies',
      emoji: '🐉',
      description: 'Fast-flying predators often found near water sources. Excellent flyers with large eyes.',
      tips: 'Visit ponds and streams during summer. They often rest on vegetation near water.'
    },
    {
      name: 'Bees',
      emoji: '🐝',
      description: 'Important pollinators that live in colonies. Essential for ecosystem health.',
      tips: 'Observe from a safe distance. Best found on flowering plants during morning hours.'
    },
    {
      name: 'Ladybugs',
      emoji: '🐞',
      description: 'Small, spotted beetles beneficial for gardens. They eat aphids and other pests.',
      tips: 'Check plants with aphid infestations. Common in spring and summer.'
    },
    {
      name: 'Grasshoppers',
      emoji: '🦗',
      description: 'Jumping insects found in grassy areas. Known for their distinctive chirping sounds.',
      tips: 'Walk slowly through tall grass. Listen for their characteristic sounds.'
    }
  ];

  // Removed test error buttons - not suitable for production

  return (
    <div className="page">
      <h2>📚 Insect Field Guide</h2>
      <p>
        Learn about different types of insects, their habitats, and the best techniques for
        observing and capturing them. This guide will help you become an expert insect hunter!
      </p>

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="insect-grid">
        {insectInfo.map((insect, index) => (
          <div key={index} className="insect-card">
            <h3>{insect.emoji} {insect.name}</h3>
            <p><strong>About:</strong> {insect.description}</p>
            <p><strong>Tips:</strong> {insect.tips}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
        <h3>🌟 Pro Tips for Insect Hunting</h3>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>Always be gentle and respect the insects' habitat</li>
          <li>Bring proper equipment: net, containers, and field guide</li>
          <li>Early morning and late afternoon are the best times</li>
          <li>Look in diverse habitats: gardens, forests, near water</li>
          <li>Take photos to document your findings</li>
          <li>Release insects after observation when possible</li>
        </ul>
      </div>
    </div>
  );
}

export default InsectGuide;
