import styled from 'styled-components';

export const Header = styled.header`
  background: $off_black;
  color: white;
  margin-bottom: $xl-size;
  padding: $m-size 0;
  height: $xl-size;

  @media (min-width: $desktop-breakpoint) {
    .header {
      margin-bottom: $xl-size;
    }
  }
`;

export const HeaderTitle = styled.header`
  font-size: $l-size;
  margin: 0;
  color: yellow;
  text-align: center;
`;

export const HeaderSubTitle = styled.header`
  color: $off_white;
  font-size: $m2-size;
  font-weight: 500;
  margin: 0;
  padding: 30px;
`;
