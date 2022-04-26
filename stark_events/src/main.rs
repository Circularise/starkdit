mod constants;
pub(crate) mod validators;

use crate::validators::Validator;
use std::io::{Read, Write};
use std::process::{Command, Stdio};
use std::thread;
use std::time::Duration;

use clap::Parser;

#[derive(Parser, Debug)]
#[clap(author, version, about, long_about = None)]
pub(crate) struct Args {
    /// The address associated to the forum.
    #[clap(long)]
    address: String,
    /// Full or relative path to the abi.
    #[clap(long)]
    abi: String,
}

fn main() {
    Validator::new().validate();
    let args = Args::parse();
    loop {
        let mut get_root_fn = Command::new("starknet")
            .arg("call")
            .arg("--address")
            .arg(&args.address.to_owned())
            .arg("--abi")
            .arg(&args.address.to_owned())
            .arg("--function")
            .arg("get_root")
            .stdout(Stdio::piped())
            .spawn()
            .unwrap();
        // I know .unwrap() is evil but I'm tired, don't judge...
        // @TODO
        thread::sleep(Duration::from_secs(10));
    }
}
