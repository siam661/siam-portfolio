// Add a new project by adding another object to this array -- the site
// numbers each one automatically (01, 02, 03...) based on its position
// here, so you don't need to manage indexes by hand.
//
// `image` is optional: drop a screenshot into `public/projects/` (e.g.
// `public/projects/my-project.jpg`) and prefix its URL with BASE_URL.
// Leave it out (or the file missing) and the site falls back to a clean
// numbered placeholder automatically -- nothing breaks either way.

export const projects = [
  {
    id: 'urban-plate',
    title: 'Urban Plate',
    description:
      'A restaurant website built to give a menu and a dining experience a clean, appetite-first presentation online.',
    url: 'https://siam661.github.io/urban-plate/',
    image: `${import.meta.env.BASE_URL}projects/urban-plate.jpg`,
  },
  {
    id: 'lumora-resort',
    title: 'Lumora Resort',
    description:
      'A resort website designed around calm pacing and imagery, built to make browsing rooms and amenities feel unhurried.',
    url: 'https://siam661.github.io/lumora-resort/',
    image: `${import.meta.env.BASE_URL}projects/lumora-resort.jpg`,
  },
];
