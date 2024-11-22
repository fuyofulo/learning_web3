use solana_program::{
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey,
    account_info::AccountInfo,  // Add this import
};

entrypoint!(process_instruction);

fn process_instruction(
    _program_id: &Pubkey, // Prefixed to silence warning
    _accounts: &[AccountInfo], // Prefixed to silence warning
    _instruction_data: &[u8], // Prefixed to silence warning
) -> ProgramResult {
    msg!("Counter program entrypoint");
    Ok(())
}
