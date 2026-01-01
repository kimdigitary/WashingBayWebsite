import {ActionState, deleteEntity, saveEntity} from "@/mutations";

export const saveProject = async (prev: ActionState, formData: FormData) =>
    await saveEntity(prev, formData, "projects", "projects");

export const addNotes = async (prev: ActionState, formData: FormData) =>
    await saveEntity(prev, formData, "add-notes", "projects");


export const deleteScenes = async (prev: ActionState, ids: number[]) =>
    await deleteEntity(prev, ids, "scenes/delete", "projects");
