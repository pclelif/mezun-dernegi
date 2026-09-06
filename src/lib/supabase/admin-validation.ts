const fields: Record<string, readonly string[]> = {
  events: ['id', 'title', 'slug', 'description', 'date', 'time', 'location', 'status', 'image_url', 'images', 'image_crops', 'is_published', 'display_order'],
  announcements: ['id', 'title', 'slug', 'content', 'date', 'image_url', 'images', 'image_crops', 'is_published', 'display_order'],
  galleries: ['id', 'title', 'slug', 'date', 'description', 'cover_image_url', 'display_order'],
  gallery_images: ['id', 'gallery_id', 'image_url', 'crop', 'display_order'],
  faqs: ['id', 'question', 'answer', 'category', 'display_order'],
  board_members: ['id', 'name', 'role', 'board_type', 'image_url', 'image_crop', 'bio', 'display_order'],
  site_content: ['section', 'content', 'updated_at'],
  contact_messages: ['is_read'],
};
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function record(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export type AdminMutation = {
  table: string;
  action: 'insert' | 'upsert' | 'update' | 'delete';
  data?: Record<string, unknown> | Record<string, unknown>[];
  match?: Record<string, string>;
  onConflict?: string;
};

export function parseAdminMutation(body: unknown): AdminMutation {
  if (!record(body)) throw new Error('Geçersiz istek.');
  const { table, action, data, match, onConflict } = body;
  if (typeof table !== 'string' || !Object.hasOwn(fields, table)) throw new Error('Geçersiz tablo.');
  if (typeof action !== 'string' || !['insert', 'upsert', 'update', 'delete'].includes(action)) throw new Error('Geçersiz işlem.');
  if (table === 'contact_messages' && action !== 'update' && action !== 'delete') throw new Error('Geçersiz mesaj işlemi.');
  const key = table === 'site_content' ? 'section' : 'id';
  if (action === 'update' || action === 'delete') {
    if (!record(match) || Object.keys(match).length !== 1 || typeof match[key] !== 'string' ||
        (key === 'id' ? !uuid.test(match[key]) : !match[key].trim())) {
      throw new Error('Tek bir kaydı belirten geçerli filtre gerekli.');
    }
  }
  if (onConflict !== undefined && (action !== 'upsert' || onConflict !== key)) throw new Error('Geçersiz çakışma alanı.');
  if (action !== 'delete') {
    const rows = Array.isArray(data) ? data : [data];
    if (!rows.length || rows.length > 100 || (action === 'update' && Array.isArray(data))) throw new Error('Geçersiz kayıt sayısı.');
    for (const row of rows) {
      if (!record(row) || !Object.keys(row).length || Object.keys(row).some(field => !fields[table].includes(field))) throw new Error('Geçersiz veri alanı.');
      if (action === 'update' && key in row) throw new Error('Kayıt anahtarı değiştirilemez.');
      for (const [field, value] of Object.entries(row)) {
        if ((field === 'id' || field === 'gallery_id') && (typeof value !== 'string' || !uuid.test(value))) throw new Error('Geçersiz kayıt kimliği.');
        if ((field === 'is_read' || field === 'is_published') && typeof value !== 'boolean') throw new Error('Geçersiz durum.');
        if (field === 'display_order' && !Number.isSafeInteger(value)) throw new Error('Geçersiz sıra.');
      }
    }
  }
  return body as AdminMutation;
}
