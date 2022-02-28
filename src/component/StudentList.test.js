import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StudentsList from './StudentsList';
import { useDispatch, useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('Test LoginPage Component', () => {
  beforeEach(() => {
    useDispatchMock.mockImplementation(() => () => {});
    useSelectorMock.mockImplementation((selector) => selector(mockState));
  });
  afterEach(() => {
    useDispatchMock.mockClear();
    useSelectorMock.mockClear();
  });

  const useDispatchMock = useDispatch;
  const useSelectorMock = useSelector;

  const mockState = {
    studentsAPI: {
      fetching: false,
      students: [],
    },
  };

  it('shows header', () => {
    render(<StudentsList />);
    const StudentManagementElement = screen.getByText('Students Dashboard', { exact: false });
    expect(StudentManagementElement).toBeInTheDocument();
  });
});
