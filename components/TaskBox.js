import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import StatusBadge from '../components/StatusBadge';
import PaperPlaneButton from '../components/PaperPlaneButton';

const TaskBox = ({ creationDate, taskName, status, taskDescription, deadline, assigner }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.taskName}>{taskName}</Text>
        <Text style={styles.creationDate}>{creationDate}</Text>
      </View>
      <Text style={styles.description}>{taskDescription}</Text>
      <View style={styles.statusBadgeContainer}>
        <StatusBadge status={status} />
        <PaperPlaneButton style={styles.paperPlaneButton} onPress={() => alert(`Action for ${taskName}`)} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.deadline}>
          Deadline: <Text style={styles.deadlineText}>{deadline}</Text>
        </Text>
        <Text style={styles.assigner}>Assigner: {assigner}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  taskName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  creationDate: {
    fontSize: 12,
    color: '#777',
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  statusBadgeContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  paperPlaneButton: {
    marginTop: 5,
    width: 20,
    height: 20,
  },
  footer: {
    marginTop: 10,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deadline: {
    fontSize: 14,
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  assigner: {
    fontSize: 14,
    color: '#333',
  },
});

export default TaskBox;
