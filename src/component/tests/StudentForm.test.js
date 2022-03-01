import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StudentForm from '../component/StudentForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useDispatchMock = useDispatch;
const useSelectorMock = useSelector;

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigate: () => ({
      useNavigate: jest.fn(),
      useSelector: jest.fn(),
      useDispatch: jest.fn(),
    }),
  };
});

// jest.mock('react-redux', () => ({
//   useSelector: jest.fn(),
//   useDispatch: jest.fn(),
// }));

describe('Test StudentForm Component', () => {
  beforeEach(() => {
    useDispatchMock.mockImplementation(() => () => {});
    useSelectorMock.mockImplementation((selector) => selector(mockState));
  });
  afterEach(() => {
    useDispatchMock.mockClear();
    useSelectorMock.mockClear();
  });

  // const useDispatchMock = useDispatch;
  // const useSelectorMock = useSelector;

  const mockState = {
    studentsAPI: {
      fetching: false,
      create_update_req_success: false,
    },
  };

  it('shows header', () => {
    render(<StudentForm />);
    const StudentManagementElement = screen.getByText('Student Form', { exact: false });
    expect(StudentManagementElement).toBeInTheDocument();
  });
});
