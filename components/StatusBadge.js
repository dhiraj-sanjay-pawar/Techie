import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const StatusBadge = ({ status }) => {
  // Convert status to lowercase for consistent comparison
  const normalizedStatus = status.toLowerCase();

  // Determine badge style based on status
  const getStatusStyle = () => {
    switch (normalizedStatus) {
      case 'high':
        return styles.high;
      case 'medium':
        return styles.medium;
      case 'asap':
        return styles.asap;
      default:
        return styles.default;
    }
  };

  return (
    <View style={[styles.badge, getStatusStyle()]}>
      <Text style={styles.text}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 20, // Rounded corners
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5, // Margin for spacing
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  high: {
    backgroundColor: '#e74c3c', // Red for High
  },
  medium: {
    backgroundColor: '#f39c12', // Orange for Medium
  },
  asap: {
    backgroundColor: '#2ecc71', // Green for ASAP
  },
  default: {
    backgroundColor: '#bdc3c7', // Gray for undefined status
  },
});

export default StatusBadge;
