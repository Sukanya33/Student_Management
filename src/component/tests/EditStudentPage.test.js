import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditStudentPage from './EditStudentPage';
import { useDispatch, useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('Test Edit Student Page Component', () => {
  beforeEach(() => {
    useSelectorMock.mockImplementation((selector) => selector.find(mockState));
    // state.studentsAPI.students.find((student) => student._id === id)
  });
  afterEach(() => {
    useSelectorMock.mockClear();
  });

  const useSelectorMock = useSelector;

  const mockState = {
    studentsAPI: {
      students: {},
    },
  };

  it('shows header', () => {
    render(<EditStudentPage />);
  });
});
