import type { User } from "$lib/scripts/firebase";
import { writable } from "svelte/store";

export const user = writable<User | null>(null);