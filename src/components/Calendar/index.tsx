import React from 'react';
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components';

import { 
  Calendar as CustomCalendar,
  LocaleConfig,
  CalendarProps 
} from 'react-native-calendars';
import { ptBr } from './localeConfig';

LocaleConfig.locales['pt-br'] = ptBr;
LocaleConfig.defaultLocale = 'pt-br';

export interface IDayProps {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
};

export interface IMarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  };
};

type TCalendarProps = CalendarProps & {
  markedDates: IMarkedDateProps;
}

export const Calendar = (props: TCalendarProps) => {
  const { markedDates, onDayPress } = props

  const { colors, fonts } = useTheme();

  return (
    <CustomCalendar
      renderArrow={(direction) => 
        <Feather
          size={24}
          color={colors.text}
          name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
        />
      }
      
      headerStyle={{
        backgroundColor: colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10,
      }}

      theme={{
        textDayFontFamily: fonts.primary_400,
        textDayHeaderFontFamily: fonts.primary_500,
        textDayHeaderFontSize: 10,
        textMonthFontSize: 20,
        textMonthFontFamily: fonts.secondary_600,
        monthTextColor: colors.title,
        arrowStyle: {
          marginHorizontal: -15,
        }
      }}
      
      firstDay={1}
      minDate={String(new Date())}
      markingType={"period"}
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
}