import '@testing-library/jest-dom';
// import { useTranslation } from 'next-i18next';
import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Home from 'pages/index.jsx';
import { getSchools, getProfessions } from 'lib/api.js';
import SchoolsHome from 'pages/schools/index.jsx';

describe('App', () => {
  it('/', async () => {
    const schools = await getSchools();

    render(<Home schools={schools} />);
    expect(
      screen.getByRole('heading', { name: /школ/ }),
    ).toBeInTheDocument();
  });

  it('/professions', async () => {
    const professions = await getProfessions();

    jest.mock('react-i18next', () => ({
      // this mock makes sure any components using the translate hook can use it without a warning being shown
      useTranslation: () => ({
        t: (str) => str,
        i18n: {
          changeLanguage: () => new Promise(() => {}),
        },
      }),
    }));

    render(<SchoolsHome schools={professions} />);

    expect(
      screen.getByText('Python-разработчик'),
    ).toBeInTheDocument();
  });
});
