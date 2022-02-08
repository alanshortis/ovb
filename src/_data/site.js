module.exports = {
  isProd: process.env.ELEVENTY_ENV === 'production',
  title: 'ØVB',
  description: 'ØVB is a cycling club',
  url: 'https://ovbcycling.com',
  twitter: '@ovbcycling',
  email: {
    general: 'hello@ovbcycling.com',
    racing: 'racing@ovbcycling.com',
    membership: 'membership@ovbcycling.com',
  },
  social: {
    facebook: 'https://www.facebook.com/ovbcycling/',
    instagram: 'https://www.instagram.com/ovbcycling/',
    strava: 'https://www.strava.com/clubs/ovbcycling',
    twitter: 'https://twitter.com/ovbcycling',
  },
  committee: [
    {
      role: 'Chairman',
      name: 'Ian Tatham',
    },
    {
      role: 'Secretary',
      name: 'Alicia Lisle',
    },
    {
      role: 'Treasurer',
      name: 'Chris Gough',
    },
    {
      role: 'Race Captain',
      name: 'Andy Sheret',
    },
    {
      role: 'Communications Director',
      name: 'Adam Travis',
    },
  ],
};
