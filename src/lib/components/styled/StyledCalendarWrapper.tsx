import styled from '@emotion/styled';
import { Box } from '@chakra-ui/react';

export const StyledCalendarWrapper = styled(Box)`
  width: 100%;
  justify-content: center;
  align-items: center;
  .react-calendar {
    width: 100%;
    background: white;
    border-radius: md;
    border: none;
  }

  .react-calendar__navigation {
    margin-bottom: 1rem;
    font-size: 17px;
    color: #7d8da6;
  }

  .react-calendar__tile {
    padding: 10px;
    color: #141736;
    font-size: 13px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #367bf5;
    }
  }

  .react-calendar__tile.available-day {
    background-color: #00bfff;
    color: #fff;
    border-radius: 50%;
    width: 60px;
    height: 60px;

    &:hover {
      background-color: #004bbd;
    }
  }

  .react-calendar__tile.selected-day {
    background-color: #0065ff;
    color: #fff;
    border-radius: 50%;
    width: 60px;
    height: 60px;
  }

  .react-calendar__tile--active {
    background-color: #e0cae0;
    color: #141736;
  }

  .react-calendar__tile--now {
    background-color: #367bf5;
    color: #141736;
    border-radius: 50%;
  }

  .react-calendar__month-view__weekdays {
    color: #141736;
    font-size: 13px;
    text-transform: capitalize;
    border-bottom: none;
    font-weight: 300;
    padding-bottom: 2px;
    text-decoration: none;
  }
`;
