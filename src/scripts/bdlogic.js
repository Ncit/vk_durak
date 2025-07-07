import { createClient } from '@supabase/supabase-js'

// const supabase = createClient('https://5e92-2a12-5940-5517-00-2.ngrok-free.app$0', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE')

// async function saveToSupabase(tableName, data) {
//   try {
//     const { data: responseData, error } = await supabase
//       .from(tableName)
//       .insert(data)
//       .select(); // Returns the inserted record if you need it

//     if (error) {
//       throw error;
//     }

//     console.log('Data saved successfully:', responseData);
//     return responseData;
//   } catch (error) {
//     console.error('Error saving to Supabase:', error.message);
//     throw error;
//   }
// }

// async function upsertToSupabase(tableName, data, onConflictColumn = 'id') {
//   try {
//     const { data: responseData, error } = await supabase
//       .from(tableName)
//       .upsert(data, { onConflict: onConflictColumn })
//       .select();

//     if (error) {
//       throw error;
//     }

//     console.log('Data upserted successfully:', responseData);
//     return responseData;
//   } catch (error) {
//     console.error('Error upserting to Supabase:', error.message);
//     throw error;
//   }
// }