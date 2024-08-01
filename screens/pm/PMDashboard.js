import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskBox from '../../components/TaskBox';
import { API_ENDPOINTS } from '../../api_config';

export default function PMDashboard() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTasks = async () => {
    try {
      const username = await AsyncStorage.getItem('loggedInUsername');
      if (!username) {
        Alert.alert('Error', 'No logged-in user found.');
        return;
      }

      const response = await fetch(`${API_ENDPOINTS.GET_TASKS_BY_STATUS}?username=${username}`);
      const data = await response.json();

      if (data.status === 'success') {
        setTasks(data.tasks);
      } else {
        Alert.alert('Error', 'Failed to fetch tasks.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while fetching tasks.');
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTasks();
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading tasks...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <TaskBox
            key={index}
            creationDate={task.Date}
            taskName={task.Title}
            status={task.Priority}
            taskDescription={task.Description}
            deadline={task.Deadline}
            assigner={task.Assigner}
            onPress={() => alert(`Action for ${task.Title}`)}
          />
        ))
      ) : (
        <View style={styles.noTasksContainer}>
          <Text style={styles.noTasksText}>No tasks found.</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
    marginTop: 50,
  },
  noTasksContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  noTasksText: {
    fontSize: 18,
    color: '#333',
  },
});
