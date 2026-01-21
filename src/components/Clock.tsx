import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <View style={styles.timeContainer}>
      <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
      <Text style={styles.dateText}>{formatDate(currentTime)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  timeContainer: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 72,
    fontWeight: '300',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  dateText: {
    fontSize: 16,
    color: '#999999',
    marginTop: 8,
    letterSpacing: 1,
  },
});
