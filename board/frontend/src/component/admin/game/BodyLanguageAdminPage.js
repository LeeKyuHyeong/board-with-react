import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../css/admin/game/BodyLanguageAdminPage.css';

const BodyLanguageAdminPage = () => {
  const [groups, setGroups] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [newGroup, setNewGroup] = useState({ name: '', description: '' });
  const [newItem, setNewItem] = useState({ name: '', description: '', group: {} });

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const response = await axios.get('/api/body-language/groups');
        setGroups(response.data);
      } catch (error) {
        console.error('Error loading groups:', error);
      }
    };
    loadGroups();
  }, []);

  const loadItems = async (groupId) => {
    try {
      const response = await axios.get(`/api/body-language/groups/${groupId}/items`);
      setItems(response.data);
    } catch (error) {
      console.error('Error loading items:', error);
    }
  };

  const handleGroupSelect = (groupId, groupName) => {
    setSelectedGroup(groupName);
    loadItems(groupId);
  };

  const addGroup = async () => {
    try {
      const response = await axios.post('/api/body-language/groups', newGroup);
      setGroups([...groups, response.data]);
      setNewGroup({ name: '', description: '' });
    } catch (error) {
      console.error('Error adding group:', error);
    }
  };

  const addItem = async () => {
    try {
      const response = await axios.post('/api/body-language/items', {
        ...newItem,
        group:{id : selectedGroup},
      });
      setItems([...items, response.data]);
      setNewItem({ name: '', description: '' });
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <div className="admin-page">
      <h1>Body Language Admin</h1>

      {/* 대분류 추가 */}
      <div className="add-section">
        <h2>Add New Group</h2>
        <input
					name="group"
          type="text"
          placeholder="Group Name"
          value={newGroup.name}
          onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
					required
        />
        <textarea
          placeholder="Group Description"
          value={newGroup.description}
          onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
        />
        <button onClick={addGroup}>Add Group</button>
      </div>

      {/* 대분류 목록 */}
      <div className="group-list">
        <h2>Groups</h2>
        <ul>
          {groups.map((group) => (
            <li key={group.id}>
              {group.name}
              <button onClick={() => handleGroupSelect(group.id, group.name)}>Select</button>
            </li>
          ))}
        </ul>
      </div>

      {/* 중분류 추가 */}
      {selectedGroup && (
        <div className="add-section">
          <h2>Add New Item to Group {selectedGroup}</h2>
          <input
            type="text"
						name="item"
            placeholder="Item Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
						required
          />
          <textarea
            placeholder="Item Description"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          />
          <button onClick={addItem}>Add Item</button>
        </div>
      )}

      {/* 중분류 목록 */}
      {selectedGroup && (
        <div className="item-list">
          <h2>Items for Group {selectedGroup}</h2>
          <ul>
            {items.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BodyLanguageAdminPage;
