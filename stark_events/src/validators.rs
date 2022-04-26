use crate::constants::BINS;
use std::process;
use std::process::{Command, Stdio};

pub(crate) struct Validator {
    missing: Vec<String>,
}

impl Validator {
    pub fn new() -> Validator {
        Validator { missing: vec![] }
    }

    pub fn validate(&mut self) {
        for bin in BINS {
            match Command::new(bin)
                .arg("--version")
                .stdout(Stdio::null())
                .spawn()
            {
                Err(_) => {
                    self.missing.push(String::from(*bin));
                }
                _ => (),
            }
            self.check_valid()
        }
    }

    fn check_valid(&self) {
        if self.missing.len() > 0 {
            println!(
                "The following packages are not installed on your system: \n {}",
                self.missing.join("\n ")
            );
            process::exit(0x0100);
        }
    }
}
