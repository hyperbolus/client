#![cfg_attr(all(not(debug_assertions), target_os = "windows"), windows_subsystem = "windows")]

use tauri::SystemTray;
use tauri::{CustomMenuItem, SystemTrayMenu, SystemTrayMenuItem};
use std::fs;
use merkle_hash::merkle_utils::get_merkle_hash;

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let hide = CustomMenuItem::new("hide".to_string(), "Hide");
    let tray_menu = SystemTrayMenu::new()
        .add_item(hide)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);
    let system_tray = SystemTray::new()
        .with_menu(tray_menu);
    let app = tauri::Builder::default()
        .system_tray(system_tray)
        .invoke_handler(tauri::generate_handler![check_games, hash_gd])
        .setup(|app| {
            use tauri::Manager;
            use window_shadows::set_shadow;

            let window = app.get_window("main").unwrap();
            let _ = set_shadow(&window, true); // Don't use unwrap() here as it will panic on Linux.
            Ok(())
        })
        /*.setup(|_| {
            tauri::async_runtime::spawn(async move {
                let rt = tokio::runtime::Handle::current();
                let rt_ = rt.clone();
                rt.spawn_blocking(move || {
                    rt_.block_on(async {
                        HttpServer::new(|| {
                            App::new()
                                .service(hello)
                                .service(relay)
                                .service(proxy)
                        })
                            .bind(("127.0.0.1", 2087))?
                            .run()
                            .await
                    })
                });
            });
            Ok(())
        })*/
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn check_games() -> String {
    let paths = fs::read_dir("C:\\Program Files (x86)\\Steam\\steamapps\\common\\").unwrap();

    let mut hello = String::from("");

    for path in paths {
        match path.unwrap().path().to_str() {
            Some(p) => hello.push_str(p),
            None => println!("has no value"),
        }
        hello.push('\n');
    }

    return hello;
}

#[tauri::command]
fn hash_gd() -> String {
    return String::from(get_merkle_hash("C:\\Program Files (x86)\\Steam\\steamapps\\common\\Geometry Dash").unwrap().to_hex().as_str());
}