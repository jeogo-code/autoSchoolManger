import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export default function setupIpcHandlers(ipcMain, db, clientsPath) {
  // Clients-related handlers
  ipcMain.handle('get-all-clients', async () => {
    try {
      const result = await db.find({ selector: { type: 'client' } })
      return result.docs
    } catch (error) {
      console.error('Error fetching clients:', error)
      return []
    }
  })

  ipcMain.handle('add-client', async (_, clientData) => {
    try {
      if (!clientData._id) {
        clientData._id = `client_${uuidv4()}`
      }
      clientData.type = 'client'
      await db.put(clientData)
      return { success: true }
    } catch (error) {
      console.error('Error adding client:', error)
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('update-client', async (_, clientData) => {
    try {
      if (!clientData._id || clientData.type !== 'client') {
        throw new Error('Invalid client data.')
      }

      const existingClient = await db.get(clientData._id)
      clientData._rev = existingClient._rev
      const updatedClient = await db.put(clientData)
      return { success: true, data: updatedClient }
    } catch (error) {
      console.error('Error updating client:', error)
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('delete-client', async (_, clientId) => {
    try {
      const client = await db.get(clientId)

      // Remove the client ID from any group they belong to
      const allGroups = await db.find({ selector: { type: 'group' } })
      for (const group of allGroups.docs) {
        if (group.clientIds.includes(clientId)) {
          group.clientIds = group.clientIds.filter((id) => id !== clientId)
          await db.put(group)
        }
      }

      // Delete the client
      await db.remove(client)
      return { success: true }
    } catch (error) {
      console.error('Error deleting client:', error)
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('upload-client-photo', async (event, { file, nom_fr, prenom_fr }) => {
    try {
      if (!file || !file.name || !file.data) {
        throw new Error('Invalid file data')
      }

      const folderName = `${prenom_fr.trim()}_${nom_fr.trim()}`
      const clientFolderPath = path.join(clientsPath, 'Clients', folderName)

      if (!fs.existsSync(clientFolderPath)) {
        fs.mkdirSync(clientFolderPath, { recursive: true })
      }

      // Remove any existing photos in the client folder
      fs.readdirSync(clientFolderPath).forEach((fileName) => {
        const filePath = path.join(clientFolderPath, fileName)
        if (fs.lstatSync(filePath).isFile()) {
          fs.unlinkSync(filePath)
        }
      })

      const filePath = path.join(clientFolderPath, file.name)
      fs.writeFileSync(filePath, Buffer.from(file.data))

      return { filePath }
    } catch (error) {
      console.error('Error uploading client photo:', error)
      throw error
    }
  })

  // Groups-related handlers
  ipcMain.handle('get-all-groups', async () => {
    try {
      const result = await db.find({ selector: { type: 'group' } })
      return result.docs
    } catch (error) {
      console.error('Error fetching groups:', error)
      return []
    }
  })

  ipcMain.handle('add-group', async (_, groupData) => {
    try {
      if (!groupData._id) {
        groupData._id = `group_${uuidv4()}`
      }
      groupData.type = 'group'
      groupData.clientIds = groupData.clientIds || []
      await db.put(groupData)
      return { success: true }
    } catch (error) {
      console.error('Error adding group:', error)
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('update-group', async (event, groupId, clientIds) => {
    try {
      // Fetch the group from the database
      const group = await db.get(groupId)

      // Update the group's clientIds
      group.clientIds = clientIds

      // Save the updated group back to the database
      await db.put(group)

      return { success: true, data: group }
    } catch (error) {
      console.error('Error updating group:', error)
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('delete-group', async (_, groupId) => {
    try {
      const group = await db.get(groupId)

      // Remove the groupId from all clients in this group
      const allClients = await db.find({ selector: { type: 'client' } })
      for (const client of allClients.docs) {
        if (client.groupId === groupId) {
          client.groupId = ''
          await db.put(client)
        }
      }

      // Delete the group
      await db.remove(group)
      return { success: true }
    } catch (error) {
      console.error('Error deleting group:', error)
      return { success: false, error: error.message }
    }
  })

  // File-related handlers
  ipcMain.handle('save-file', async (_, folderName, fileName, fileData) => {
    try {
      folderName = folderName.replace(/[^a-zA-Z0-9-_]/g, '_') // Sanitize folder name
      const folderPath = path.join(clientsPath, folderName)
      const filePath = path.join(folderPath, fileName)

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true })
      }

      // Remove any existing file in the folder
      fs.readdirSync(folderPath).forEach((file) => {
        const existingFilePath = path.join(folderPath, file)
        if (fs.lstatSync(existingFilePath).isFile()) {
          fs.unlinkSync(existingFilePath)
        }
      })

      fs.writeFileSync(filePath, Buffer.from(fileData))
      return { success: true, path: filePath }
    } catch (error) {
      console.error('Error saving file:', error)
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('delete-file', async (_, filePath) => {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
      return { success: true }
    } catch (error) {
      console.error('Error deleting file:', error)
      return { success: false, error: error.message }
    }
  })

  // Lesson-related handlers
  ipcMain.handle('get-all-lessons', async () => {
    try {
      const result = await db.find({ selector: { type: 'lesson' } })
      return result.docs
    } catch (error) {
      console.error('Error fetching lessons:', error)
      return []
    }
  })

  ipcMain.handle('add-lesson', async (_, lessonData) => {
    try {
      if (!lessonData.clientID) {
        throw new Error('Invalid lesson data: Missing clientID')
      }

      lessonData._id = lessonData._id || `lesson_${uuidv4()}`
      lessonData.type = 'lesson'
      await db.put(lessonData)
      return { success: true }
    } catch (error) {
      console.error('Error adding lesson:', error)
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('update-lesson', async (_, lessonData) => {
    try {
      if (!lessonData._id || lessonData.type !== 'lesson') {
        throw new Error('Invalid lesson data.')
      }

      const existingLesson = await db.get(lessonData._id)
      lessonData._rev = existingLesson._rev
      const updatedLesson = await db.put(lessonData)
      return { success: true, data: updatedLesson }
    } catch (error) {
      console.error('Error updating lesson:', error)
      return { success: false, error: error.message }
    }
  })

  ipcMain.handle('delete-lesson', async (_, lessonId) => {
    try {
      const lesson = await db.get(lessonId)
      await db.remove(lesson)
      return { success: true }
    } catch (error) {
      console.error('Error deleting lesson:', error)
      return { success: false, error: error.message }
    }
  })
}
