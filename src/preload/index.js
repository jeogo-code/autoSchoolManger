import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  getAllClients: () => ipcRenderer.invoke('get-all-clients'),
  addClient: (clientData) => ipcRenderer.invoke('add-client', clientData),
  getAllGroups: () => ipcRenderer.invoke('get-all-groups'),
  addGroup: (groupData) => ipcRenderer.invoke('add-group', groupData),
  updateGroup: (groupId, clientIds) => ipcRenderer.invoke('update-group', groupId, clientIds),
  deleteGroup: (groupId) => ipcRenderer.invoke('delete-group', groupId),
  deleteClient: (clientId) => ipcRenderer.invoke('delete-client', clientId),
  saveFile: (folderName, fileName, fileData) =>
    ipcRenderer.invoke('save-file', folderName, fileName, fileData),
  uploadClientPhoto: (formData) => ipcRenderer.invoke('upload-client-photo', formData),
  updateClient: (clientData) => ipcRenderer.invoke('update-client', clientData),
  deleteFile: (filePath) => ipcRenderer.invoke('delete-file', filePath),

  // Lesson-related methods
  getAllLessons: () => ipcRenderer.invoke('get-all-lessons'),
  addLesson: (lessonData) => ipcRenderer.invoke('add-lesson', lessonData),
  updateLesson: (lessonData) => ipcRenderer.invoke('update-lesson', lessonData),
  deleteLesson: (lessonId) => ipcRenderer.invoke('delete-lesson', lessonId)
})
