import React from 'react';
import EnergySavingsChart from '../charts/EnergySavingsChart';
import styled from 'styled-components';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Set the height of the page to 100% of the viewport height */
`;
const headingStyle = {
  fontWeight: 'bold',
};

const ContentWrapper = styled.div`
  flex: 1; /* Take up all available space in the vertical direction */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Trends() {
  return (
    <PageWrapper>
       <h1 style={headingStyle}>Energy Savings Trends</h1>
      <ContentWrapper>
        <EnergySavingsChart />
      </ContentWrapper>
    </PageWrapper>
  );
}

export default Trends;