using System;
using System.Drawing;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace DiskWarren.Setup;

public class SetupForm : Form
{
    private readonly ProgressBar progressBar;
    private readonly Label statusLabel;
    private readonly Label titleLabel;

    public SetupForm()
    {
        Text = "DiskWarren Setup";
        Size = new Size(460, 190);
        FormBorderStyle = FormBorderStyle.FixedDialog;
        MaximizeBox = false;
        MinimizeBox = false;
        StartPosition = FormStartPosition.CenterScreen;
        BackColor = Color.FromArgb(24, 27, 36);
        ForeColor = Color.White;

        try { Icon = Icon.ExtractAssociatedIcon(Application.ExecutablePath); } catch { }

        titleLabel = new Label
        {
            Text = "Installing DiskWarren...",
            Font = new Font("Segoe UI", 11, FontStyle.Bold),
            ForeColor = Color.White,
            Location = new Point(24, 20),
            AutoSize = true
        };

        statusLabel = new Label
        {
            Text = "Preparing installation environment...",
            Font = new Font("Segoe UI", 9),
            ForeColor = Color.FromArgb(156, 163, 175),
            Location = new Point(24, 52),
            Size = new Size(400, 20)
        };

        progressBar = new ProgressBar
        {
            Location = new Point(24, 82),
            Size = new Size(396, 20),
            Style = ProgressBarStyle.Continuous,
            Value = 10
        };

        Controls.Add(titleLabel);
        Controls.Add(statusLabel);
        Controls.Add(progressBar);

        Shown += SetupForm_Shown;
    }

    private async void SetupForm_Shown(object? sender, EventArgs e)
    {
        var progress = new Progress<InstallProgress>(p =>
        {
            progressBar.Value = Math.Clamp(p.Percent, 0, 100);
            statusLabel.Text = p.Status;
        });

        try
        {
            await InstallerLogic.InstallAsync(progress, launchAfterInstall: true);
            await Task.Delay(400);
            Application.Exit();
        }
        catch (Exception ex)
        {
            MessageBox.Show($"Installation failed:\n{ex.Message}", "DiskWarren Setup", MessageBoxButtons.OK, MessageBoxIcon.Error);
            Application.Exit();
        }
    }

    [STAThread]
    static void Main()
    {
        ApplicationConfiguration.Initialize();
        Application.Run(new SetupForm());
    }
}
