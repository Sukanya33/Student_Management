import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from './LoginPage';
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
    },
  };

  it('shows header', () => {
    render(<LoginPage />);
    const StudentManagementElement = screen.getByText('Student Management', { exact: false });
    expect(StudentManagementElement).toBeInTheDocument();
  });

  it('render email input', () => {
    render(<LoginPage />);

    // const emailInputElement = screen.getByLabelText('Email:', { exact: false });
    // expect(emailInputElement).toBeInTheDocument();
    // expect(emailInputElement).toHaveAttribute('type', 'email');

    // const formElement = screen.getByTex
  });

  // test('Email as a label', () => {
  //   render(<LoginPage />);

  //   const labelEmailElement = screen.getAllByText('Email:', { exact: false });
  //   expect(labelEmailElement).toBeInTheDocument();
  // });
});
