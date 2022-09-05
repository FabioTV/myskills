import {groupssettings} from 'googleapis/build/src/apis/groupssettings';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Platform,
} from 'react-native';
import {Button} from '../components/Button';
import {SkillCard} from '../components/SkillCard';

interface SkillData {
  id: string;
  name: string;
  date?: Date;
}

export function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [groupssettings, setGreatting] = useState('');

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill,
      date: new Date(),
    };

    setMySkills(oldState => [...oldState, data]);
  }

  function handleRemoveSkill(id: string) {
    console.log(id);
    setMySkills(oldState => oldState.filter(skill => skill.id !== id));
  }

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreatting('Good morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreatting('Good afternon');
    } else {
      setGreatting('Good night');
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Fábio</Text>

      <TextInput
        style={styles.input}
        placeholder="New Skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />

      <Button onPress={handleAddNewSkill} title="Add" />

      <Text style={[styles.title, {marginVertical: 50}]}>My Skills</Text>

      <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <SkillCard
            skill={item.name}
            onPress={() => handleRemoveSkill(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingVertical: 70,
    paddingHorizontal: 30,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1F1E25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS == 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },
});
