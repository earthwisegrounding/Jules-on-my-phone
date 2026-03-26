import React from 'react';
import { View, Text, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface AgentSession {
  id: string;
  repoName: string;
  taskDescription: string;
  status: 'Waiting for Approval' | 'In Progress' | 'Completed' | 'Failed';
}

const DUMMY_SESSIONS: AgentSession[] = [
  {
    id: '1',
    repoName: 'react-native-app',
    taskDescription: 'Implement navigation and home screen',
    status: 'Waiting for Approval',
  },
  {
    id: '2',
    repoName: 'backend-api',
    taskDescription: 'Fix user authentication bug',
    status: 'In Progress',
  },
  {
    id: '3',
    repoName: 'landing-page',
    taskDescription: 'Update copy on the hero section',
    status: 'Completed',
  },
  {
    id: '4',
    repoName: 'payment-service',
    taskDescription: 'Integrate Stripe webhooks',
    status: 'Failed',
  },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  const renderItem: ListRenderItem<AgentSession> = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.repoName}>{item.repoName}</Text>
          <View
            style={[
              styles.statusBadge,
              item.status === 'Waiting for Approval' && styles.statusWarning,
              item.status === 'In Progress' && styles.statusInfo,
              item.status === 'Completed' && styles.statusSuccess,
              item.status === 'Failed' && styles.statusDanger,
            ]}
          >
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
        <Text style={styles.taskDescription}>{item.taskDescription}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={DUMMY_SESSIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + 16 }
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  repoName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#eee',
  },
  statusWarning: {
    backgroundColor: '#fff3cd',
  },
  statusInfo: {
    backgroundColor: '#cce5ff',
  },
  statusSuccess: {
    backgroundColor: '#d4edda',
  },
  statusDanger: {
    backgroundColor: '#f8d7da',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
